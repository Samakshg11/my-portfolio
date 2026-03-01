type SplitTarget = string | Element | Array<string | Element>;

type SplitOptions = {
  type: string;
  linesClass?: string;
};

export type SplitResult = {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
};

const toElements = (target: SplitTarget): HTMLElement[] => {
  const entries = Array.isArray(target) ? target : [target];
  const elements: HTMLElement[] = [];

  entries.forEach((entry) => {
    if (typeof entry === "string") {
      document.querySelectorAll<HTMLElement>(entry).forEach((el) => {
        elements.push(el);
      });
      return;
    }

    if (entry instanceof HTMLElement) {
      elements.push(entry);
    }
  });

  return elements;
};

const buildSplitForElement = (
  element: HTMLElement,
  includeChars: boolean,
  includeWords: boolean,
  includeLines: boolean,
  linesClass: string
) => {
  const text = element.textContent ?? "";
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chars: HTMLElement[] = [];
  const wordNodes: HTMLElement[] = [];
  const lineNodes: HTMLElement[] = [];

  element.textContent = "";

  words.forEach((word, index) => {
    const lineNode = document.createElement("span");
    lineNode.className = linesClass;
    lineNode.style.display = "inline-block";
    lineNode.style.overflow = "hidden";
    lineNode.style.verticalAlign = "top";

    const wordNode = document.createElement("span");
    wordNode.className = "split-word";
    wordNode.style.display = "inline-block";
    wordNode.style.whiteSpace = "pre";

    Array.from(word).forEach((char) => {
      const charNode = document.createElement("span");
      charNode.className = "split-char";
      charNode.style.display = "inline-block";
      charNode.textContent = char;
      wordNode.appendChild(charNode);
      chars.push(charNode);
    });

    lineNode.appendChild(wordNode);
    element.appendChild(lineNode);

    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }

    if (includeWords) wordNodes.push(wordNode);
    if (includeLines) lineNodes.push(lineNode);
  });

  return {
    chars: includeChars ? chars : [],
    words: includeWords ? wordNodes : [],
    lines: includeLines ? lineNodes : [],
  };
};

export const splitText = (
  target: SplitTarget,
  options: SplitOptions
): SplitResult => {
  const elements = toElements(target);
  const originals = elements.map((element) => ({
    element,
    html: element.innerHTML,
  }));

  const includeChars = options.type.includes("chars");
  const includeWords = options.type.includes("words");
  const includeLines = options.type.includes("lines");
  const linesClass = options.linesClass ?? "split-line";

  const allChars: HTMLElement[] = [];
  const allWords: HTMLElement[] = [];
  const allLines: HTMLElement[] = [];

  elements.forEach((element) => {
    const splitNodes = buildSplitForElement(
      element,
      includeChars,
      includeWords,
      includeLines,
      linesClass
    );
    allChars.push(...splitNodes.chars);
    allWords.push(...splitNodes.words);
    allLines.push(...splitNodes.lines);
  });

  return {
    chars: allChars,
    words: allWords,
    lines: allLines,
    revert: () => {
      originals.forEach(({ element, html }) => {
        element.innerHTML = html;
      });
    },
  };
};
