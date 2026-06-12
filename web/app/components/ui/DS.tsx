"use client";
import React from "react";
import clsx from "clsx";
import styled from "styled-components";
// import Intro from "./Splash";

type SpaceProps = {
  space: string;
};
const Space = styled.div<SpaceProps>`
  /* background: var(--color-primary); */
  background-color: red;
  margin-bottom: 1rem;
  height: var(${(props) => props.space});
`;

const DesignSystem = () => {
  const texts = [
    "text-5xl",
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-lg",
    "text-md",
    "text-base",
    "text-sm",
    "text-xs",
  ];
  const spaces = ["h-sm", "h-md", "h-lg", "h-xl", "h-2xl"];

  return (
    <div className='design-system p-md'>
      <section className=' mb-lg'>
        <h2 className='text-lg mb-lg b-b'>Spaces ({spaces.length})</h2>
        {spaces.map((item, i) => (
          <div className='flex gap-sm' key={i}>
            <div className='w-4/12'>{item}</div>
            <div
              className={clsx(
                "flex-2 bg-red text-center",
                item,
                "mb-sm"
              )}></div>
          </div>
        ))}
      </section>

      <section className=' mb-lg '>
        <h2 className='text-lg mb-lg b-b'>Font sizes ({texts.length})</h2>

        {texts.map((item, i) => (
          <div className={clsx(item, "mb-md")} key={i}>
            <div className='row'>
              <div className='col-md-4'>
                <span className='text-md'>Text {item}</span>
              </div>
              <div className='col-xs'>
                <p className={clsx(`text-${item} uppercase- py-02re-`)}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
                  <a href='#'>dolorem</a>, nobis fugiat asperiores hic
                  repudiandae vitae quae.
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* <Section>
        <i className="icon-arrow icon-arrow__n"></i>
        <i className="icon-arrow icon-arrow__e"></i>
        <i className="icon-arrow icon-arrow__s"></i>
        <i className="icon-arrow icon-arrow__w"></i>
      </Section> */}

      <section className=' mb-lg'>
        <p className='text-md'>
          Lorem ipsum <b>dolor</b> sit, amet <em>consectetur</em> adipisicing
          <br />
          elit. Beatae earum, deleniti inventore vero asperiores voluptatem!
          <br />
          <a href='#'>Distinction</a> temporibus minima sint <i>autem</i>.
        </p>
        <ul className='mb-md'>
          <li>List 1</li>
          <li>List 2</li>
        </ul>
      </section>

      <section className='mb-lg'>
        <h2 className='text-lg mb-1'>Buttons</h2>
        <ul className='flex items-baseline gap-1e'>
          <li className='pr-2'>
            <a href='#' className='  '>
              Link
            </a>
          </li>
          <li className='pr-2'>
            <a href='#' className='pill pill--md  '>
              Link
            </a>
          </li>
          <li className='pr-2'>
            <a href='#' className='pill pill--md is-active '>
              Link
            </a>
          </li>
          <li className='pr-2'>
            <button className='btn'>Button</button>
          </li>
        </ul>
      </section>

      <section className=' mb-lg'>
        <h2 className='text-lg mb-1'>text image</h2>
        <div className='text-image mb-md'>
          <div className='grid grid-cols-2 gap-md'>
            <figure>
              <img
                src='https://goldenblocks.fr/wp-content/uploads/2021/01/photo-streetrunner-2.jpg'
                alt=''
              />
            </figure>
            <div className='text'>
              <h3 className='text-xl'>Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                ipsum sunt vero cupiditate dolorem minima animi quis ducimus,
                iure odit beatae! Perspiciatis veniam laudantium molestiae!
                Ipsum sapiente odio iste fugit.
              </p>
            </div>
          </div>
        </div>
        <div className='text-image text-image--reverse mb-md' dir='rtl'>
          <div className='grid grid-cols-2 gap-md'>
            <figure>
              <img
                src='https://goldenblocks.fr/wp-content/uploads/2021/01/photo-streetrunner-2.jpg'
                alt=''
              />
            </figure>
            <div className='text '>
              <h3 className='text-xl'>Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                ipsum sunt vero cupiditate dolorem minima animi quis ducimus,
                iure odit beatae! Perspiciatis veniam laudantium molestiae!
                Ipsum sapiente odio iste fugit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
