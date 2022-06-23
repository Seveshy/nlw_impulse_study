import { CloseButton } from "../CloseButton";

import bugImageUlr from "../../assets/bug.svg";
import ideiaImageUlr from "../../assets/idea.svg";
import thoughtImageUlr from "../../assets/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problem",
    image: {
      source: bugImageUlr,
      alt: "Imagem de um inseto",
    },
  },

  IDEA: {
    title: "Ideia",
    image: {
      source: ideiaImageUlr,
      alt: "Imagem de uma lâmpada",
    },
  },

  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUlr,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackChangeType={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com amor por{" "}
        <a
          className="underline underline-offset-2"
          href="https://danielmajor.com.br"
        >
          Daniel Major
        </a>
      </footer>
    </div>
  );
}
