"use client";

import { useEffect, useState, useRef } from "react";
import { AIMessage, UserMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { pickRandomResultGenerationMessage } from "@/lib/flavorPersonality/AI_answers";
import Image from "next/image";
import ResultCard from "./ResultCard";
import { usePathname, useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function mapQuestionToMessage(question) {
  return {
    id: question.id,
    role: "assistant",
    content: question.text,
    options: question.options.map((option) => ({
      label: option,
      value: option,
    })),
  };
}

function sleepRandom(min = 600, max = 1400) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentQuestionState, setCurrentQuestionState] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingResult, setIsGeneratingResult] = useState(false);
  const [resultGenerationMessage, setResultGenerationMessage] = useState("");
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const previousMessageCountRef = useRef(0);

  // Uppdatera URL med resultatdata när resultatet ändras
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!result) return;

    const params = new URLSearchParams();
    if (result.personalityName)
      params.set("personalityName", result.personalityName);
    if (result.headline) params.set("headline", result.headline);
    if (result.description) params.set("description", result.description);
    if (result.shareText) params.set("shareText", result.shareText);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [result, pathname, router]);

  useEffect(() => {
    if (!hasStarted) {
      previousMessageCountRef.current = messages.length;
      return;
    }

    const previousCount = previousMessageCountRef.current;

    if (messages.length <= previousCount) {
      previousMessageCountRef.current = messages.length;
      return;
    }

    const scrollContainer = scrollContainerRef.current;

    // Om användaren har scrollat upp och inte är nära botten, scrolla inte automatiskt
    if (scrollContainer && shouldAutoScrollRef.current) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }

    previousMessageCountRef.current = messages.length;
  }, [hasStarted, messages.length]);

  function handleChatScroll() {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const distanceFromBottom =
      scrollContainer.scrollHeight -
      scrollContainer.scrollTop -
      scrollContainer.clientHeight;

    shouldAutoScrollRef.current = distanceFromBottom < 80;
  }

  async function loadQuestion(stage, initialLoad = false) {
    try {
      setError(null);

      if (initialLoad) {
        setIsLoading(true);
      }

      const res = await fetch(
        `${API_BASE_URL}/flavor-personality/question?stage=${stage}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      if (!res.ok) {
        throw new Error("Kunde inte hämta fråga.");
      }

      const data = await res.json();

      const assistantMessage = mapQuestionToMessage(data.question);

      setMessages((prev) =>
        initialLoad ? [assistantMessage] : [...prev, assistantMessage],
      );

      setCurrentQuestionState({
        stage: data.stage,
        isLastQuestion: data.isLastQuestion,
        question: data.question,
      });
    } catch (err) {
      if (initialLoad) {
        setHasStarted(false);
      }

      setError(err.message || "Något gick fel.");
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }

  async function handleStartChat() {
    setIsTyping(true);
    setHasStarted(true);
    await sleepRandom(500, 1000); // Liten fördröjning för bättre UX
    setIsTyping(false);
    setError(null);
    setMessages([]);
    setAnswers([]);
    setResult(null);
    setCurrentQuestionState(null);

    await loadQuestion(1, true);
  }

  async function generateResult(finalAnswers) {
    try {
      setError(null);
      setIsTyping(true);
      setIsGeneratingResult(true);
      setResultGenerationMessage(pickRandomResultGenerationMessage());

      const res = await fetch(`${API_BASE_URL}/flavor-personality/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: finalAnswers,
        }),
      });

      if (!res.ok) {
        throw new Error("Kunde inte generera resultat.");
      }

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.reply,
            options: [],
          },
        ]);
      }

      if (data.result) {
        setResult(data.result);
      }
    } catch (err) {
      setError(err.message || "Något gick fel.");
    } finally {
      setIsTyping(false);
      setIsGeneratingResult(false);
      setResultGenerationMessage("");
    }
  }

  async function handleSelect(option) {
    if (!currentQuestionState || isTyping || isLoading) return;

    const { stage, isLastQuestion, question } = currentQuestionState;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: option.label,
    };

    const answerEntry = {
      stage,
      questionId: question.id,
      questionText: question.text,
      answer: option.value,
    };

    const finalAnswers = [...answers, answerEntry];

    setMessages((prev) => [
      ...prev.map((msg) =>
        msg.id === question.id ? { ...msg, options: [] } : msg,
      ),
      userMessage,
    ]);

    setAnswers(finalAnswers);

    if (isLastQuestion) {
      await generateResult(finalAnswers);
      return;
    }

    // Simulerar "AI thinking"
    setIsTyping(true);
    await sleepRandom();

    await loadQuestion(stage + 1);
  }

  return (
    <div className="flex min-h-100 flex-col justify-between gap-4 rounded-2xl border border-white/25 bg-slate-900/70 p-4 pr-2">
      <div
        ref={scrollContainerRef}
        onScroll={handleChatScroll}
        className="flex max-h-100 flex-1 flex-col items-start gap-4 overflow-y-auto pr-2"
      >
        {!hasStarted && !isLoading && (
          <>
            <button
              type="button"
              onClick={handleStartChat}
              className="mx-auto inline-flex items-center rounded-xl border border-cyan-100/80 bg-cyan-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
            >
              Starta smaktestet
            </button>
            <div className="mx-auto max-w-xs text-center">
              <Image
                src="/images/other/robot.png"
                alt="Robot illustration"
                width={512}
                height={512}
                className="mx-auto mt-4 h-60 w-60 rounded-lg opacity-80"
              />
            </div>
          </>
        )}
        {isLoading && <TypingIndicator />}

        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage key={message.id} content={message.content} />
          ) : (
            <AIMessage
              key={message.id}
              content={message.content}
              options={message.options}
              onSelect={handleSelect}
              disableOptions={isTyping || isLoading}
            />
          ),
        )}

        {isTyping && isGeneratingResult && (
          <AIMessage
            content={resultGenerationMessage}
            options={[]}
            onSelect={() => {}}
            disableOptions={true}
          >
            <TypingIndicator className="bg-transparent px-0" />
          </AIMessage>
        )}

        {isTyping && !isGeneratingResult && <TypingIndicator />}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
      </div>

      {result && <ResultCard result={result} />}

      {/* <ChatInput /> */}
    </div>
  );
}
