import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshowButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setSecreenshot] = useState(null);
  const [comment, setComment] = useState("");
  const [isSendingLoading, setIsSendingLoading] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingLoading(true);

    console.log(comment);

    api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })

    setIsSendingLoading(false);

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-thin scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo..."
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setSecreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:bg-brand-500"
          >
            { isSendingLoading ? <Loading /> : 'Enviar feedback' }
          </button>
        </footer>
      </form>
    </>
  );
}
