"use client";
import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import SocialLinks from "./SocialLinks";
import Skills from "./Skills";
import PersonalProfile from "./PersonalProfile";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Languages from "./Languages";

//DRAG AND DROP IMPORTS
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useGlobalContext } from "@/app/Context/store";

const ResumeEditor = () => {
  const { setHightlightHR } = useGlobalContext();

  //state for keeping track of all the sections
  const { draggableSecions, setDraggableSections } = useGlobalContext();

  const SortDraggableSections = draggableSecions.map((section, index) => {
    switch (section) {
      case "personalprofile":
        return <PersonalProfile key={index} id={section} />;
      case "skills":
        return <Skills key={index} id={section} />;
      case "sociallinks":
        return <SocialLinks key={index} id={section} />;
      case "workexperience":
        return <WorkExperience key={index} id={section} />;
      case "education":
        return <Education key={index} id={section} />;
      case "languages":
        return <Languages key={index} id={section} />;
      default:
        return null; // Handle unknown sections if needed
    }
  });

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  const handleSectionDrag = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setDraggableSections((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
    setHightlightHR("");
  };

  //function for highlighting the hr of the draggedover section
  const handleDragOver = (e: any) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      console.log(over.id);
      setHightlightHR(over.id);
    }
  };

  return (
    <DndContext
      id="dnd-provider"
      sensors={sensors}
      collisionDetection={closestCenter}
      autoScroll={{
        enabled: false,
      }}
      onDragEnd={handleSectionDrag}
      onDragOver={handleDragOver}
    >
      <div className="overflow-x-hidden pt-6 pb-10 w-full pr-2">
        <div className="relative xs:left-[3.9rem] px-3 xs:px-10 max-w-full xs:max-w-[95%] lg:max-w-[94%] pb-40">
          <PersonalDetails />
          <SortableContext
            items={draggableSecions}
            strategy={verticalListSortingStrategy}
          >
            {...SortDraggableSections}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default ResumeEditor;
