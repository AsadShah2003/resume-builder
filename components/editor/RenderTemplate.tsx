import Resume2 from "./Resumes/Template_2/Resume2";
import Resume1 from "./Resumes/Template_1/Resume1";
import Resume3 from "./Resumes/Template_3/Resume3";
import Resume4 from "./Resumes/Template_4/Resume4";
import Resume5 from "./Resumes/Template_5/Resume5";
import Resume6 from "./Resumes/Template_6/Resume6";
import Resume7 from "./Resumes/Template_7/Resume7";
import Resume8 from "./Resumes/Template_8/Resume8";
import Resume9 from "./Resumes/Template_9/Resume9";
import Resume10 from "./Resumes/Template_10/Resume10";
import { useGlobalContext } from "@/app/Context/store";
import { Dispatch, Ref, SetStateAction } from "react";

interface RenderSelectedTemplateProps {
  draggableSecions: string[];
  setDraggableSections: Dispatch<SetStateAction<string[]>>;
  templateRef?: Ref<any> | null;
}

export const RenderSelectedTemplate: React.FC<RenderSelectedTemplateProps> = ({
  draggableSecions,
  setDraggableSections,
  templateRef,
}) => {
  const { activeTemplate } = useGlobalContext();

  switch (activeTemplate) {
    case "template1":
      return (
        <Resume1
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template2":
      return (
        <Resume2
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template3":
      return (
        <Resume3
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template4":
      return (
        <Resume4
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template5":
      return (
        <Resume5
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template6":
      return (
        <Resume6
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template7":
      return (
        <Resume7
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template8":
      return (
        <Resume8
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template9":
      return (
        <Resume9
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );
    case "template10":
      return (
        <Resume10
          draggableSections={draggableSecions}
          setDraggableSections={setDraggableSections}
          forwardRef={templateRef && templateRef}
        />
      );

    default:
      return null;
  }
};
