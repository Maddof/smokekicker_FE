"use client";

function XShareButton({ shareUrl, shareText }) {
  const handleShare = () => {
    const absoluteShareUrl = shareUrl?.startsWith("http")
      ? shareUrl
      : `${window.location.origin}${shareUrl || window.location.pathname}`;

    const text =
      shareText?.trim() ||
      "Jag har gjort Smokifys smaktest och fatt en personlig smakprofil.";

    const xIntentUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(absoluteShareUrl)}`;

    window.open(xIntentUrl, "_blank", "width=600,height=500");
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-[85%] text-white hover:bg-zinc-800"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M18.901 1.153h3.68l-8.039 9.19L24 22.847h-7.406l-5.8-7.584-6.637 7.584H.474l8.598-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.645h2.039L6.486 3.24H4.298z" />
      </svg>
      Dela på X
    </button>
  );
}

export default XShareButton;
