import React, { FC, useState, useEffect, useRef } from 'react';
import SliderContent from '../SliderContent';
import { Container } from './index.styles';
import Slide from '../Slide';
import Arrow from '../Arrow';
import Dots from '../Dots';

interface Props {
  slides: string[],
  autoPlay: number,
}

const Slider:FC<Props> = ({slides = [], autoPlay}) => {

  const getWidth = () => window.innerWidth;
  const [ translate, setTranslate ] = useState(0);
  const [ transition ] = useState(0.45);
  const [ activeIndex, setActiveIndex ] = useState(0);

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    }

    const interval = setInterval(play, autoPlay * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(()=>{
    autoPlayRef.current = nextSlide;
  });

  const nextSlide = () => {
    if (activeIndex === slides.length - 1) {
      setTranslate(0);
      setActiveIndex(0);
    } else {
    setActiveIndex(prevActiveIndex => prevActiveIndex + 1)
    setTranslate(prevTranslate => prevTranslate + getWidth());
    }
  }

  const autoPlayRef = useRef(nextSlide);

  useEffect(()=>{
    console.log("active index", activeIndex);
    console.log("translate", translate);
  }, [activeIndex, translate])

  const prevSlide = () => {
    if (activeIndex === 0) {
      setTranslate((slides.length - 1) * getWidth());
      setActiveIndex(slides.length - 1)
    } else {
      setActiveIndex(prevActiveIndex => prevActiveIndex - 1);
      setTranslate(prevTranslate => prevTranslate - getWidth());
    }
  }

  return (
    <Container>
      <SliderContent
        translate={translate}
        transition={transition}
        width={getWidth() * slides.length}>
          {slides.map((slide, i) => (
          <Slide key={slide + i} content={slide} />
        ))}
      </SliderContent>
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <Dots slides={slides} activeIndex={activeIndex} />
    </Container>
  )}

export default Slider;