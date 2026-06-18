import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageContext } from "../context/PageContext";
import { useGridShrinkRange } from "../hooks/useGridShrinkRange";

gsap.registerPlugin(ScrollTrigger);
type Props = {
  animated?: boolean;
  playIntro?: boolean;
  startVar?: string;
  endVar?: string;
};

const RitaLogo = ({
  animated = false,
  playIntro = false,
  startVar = "--gridder-3_5",
  endVar = "--gridder-1_5",
}: Props) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const { layoutReady, layoutVersion } = usePageContext();
  const shrink = useGridShrinkRange(
    startVar,
    endVar,
    layoutReady,
    layoutVersion,
  );

  useEffect(() => {
    if (!animated || !layoutReady || !logoRef.current || !shrink) return;

    if (!playIntro) {
      gsap.set(logoRef.current, { width: shrink.endWidth });
      return;
    }

    const tween = gsap.fromTo(
      logoRef.current,
      { width: shrink.startWidth },
      {
        width: shrink.endWidth,
        ease: "none",
        scrollTrigger: { start: 0, end: shrink.range, scrub: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animated, playIntro, layoutReady, shrink]);

  return (
    <div className='rita-logo' ref={logoRef}>
      <svg viewBox='0 0 744 191' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M629.556 153.449C620.052 153.449 613.975 148.408 613.975 140.202C613.975 125.901 631.66 129.105 646.929 116.405L650.357 112.967V124.611C650.357 143.133 642.956 153.449 629.518 153.449M589.941 191C616.04 191 638.749 184.904 651.643 164.82V187.835H743.961V115.624C743.961 57.6751 706.527 43.6471 632.673 43.6471C576.503 43.6471 537.472 51.3058 526.643 92.0614H614.988C616.585 83.0741 623.714 77.5254 635.283 77.5254C641.593 77.5254 649.773 79.1275 649.773 86.2392C649.773 99.7201 619.195 99.7201 603.886 100.267C541.094 102.104 521.073 118.242 521.073 144.188C521.073 174.08 547.171 191 589.902 191M433.779 187.835H515.269V148.134H487.573C481.769 148.134 478.341 144.696 478.341 138.874V87.2942H515.269V47.5937H478.341V17.1541H383.413V47.5937H363.625V87.2942H383.413V140.202C383.413 174.588 396.852 187.835 433.779 187.835ZM258.374 187.835H353.342V47.6328H258.374V187.835ZM258.374 37.0434H353.342V0H258.374V37.0434ZM126.519 82.019H100.148V47.6328H126.519C141.009 47.6328 147.631 52.9079 147.631 64.8259C147.631 76.7439 141.048 82.019 126.519 82.019ZM0 187.835H100.226V121.68H116.041C134.232 121.68 138.477 126.448 139.529 144.188C139.763 165.992 139.529 174.549 139.529 187.835H246.572V187.053C246.611 174.549 246.572 164.546 246.611 153.722C246.611 127.425 240.028 106.91 193.596 102.924C231.03 97.6491 246.611 80.964 246.611 54.2365C246.611 16.1381 218.915 0 163.524 0H0V187.835Z'
          fill='var(--color-accent)'
        />
      </svg>
    </div>
  );
};

export default RitaLogo;
