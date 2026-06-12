import { useState, useEffect } from "react";

const useSupports = (supportCondition: string) => {
  // Create a state to store declaration check result
  const [checkResult, setCheckResult] = useState<boolean | undefined>();

  useEffect(() => {
    // Run check as a side effect, on user side only
    setCheckResult(CSS.supports(supportCondition));
  }, [supportCondition]);

  return checkResult;
};

const hacksMapping = {
  // anything -moz will work, I assume
  firefox: "-moz-appearance:none",
  safari: "-webkit-hyphens:none",
  // tough one because Webkit and Blink are relatives
  chrome:
    'not (-webkit-hyphens:none)) and (not (-moz-appearance:none)) and (list-style-type:"*"',
};

export const useDetectBrowser = () => {
  const isFirefox = useSupports(hacksMapping.firefox);
  const isChrome = useSupports(hacksMapping.chrome);
  const isSafari = useSupports(hacksMapping.safari);

  return [
    { browser: "firefox", condition: isFirefox },
    { browser: "chromium based", condition: isChrome },
    { browser: "safari", condition: isSafari },
  ].find(({ condition }) => condition)?.browser as
    | "firefox"
    | "chromium based"
    | "safari"
    | undefined;
};
