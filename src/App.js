import styles from "./App.module.css";
import React, { Component } from "react";
import Statistics from "./components/Statistics/Statistics";
import Notification from "./components/Notification/Notification";
import FeedbackOptions from "./components/FeedbackOptions/FeedbackOptions";
import Section from "./components/Section/Section";

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = (feedback) => {
    this.setState((prevState) => {
      return { [feedback]: prevState[feedback] + 1 };
    });
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, value) => acc + value);
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    return total > 0 ? Math.round((this.state.good / total) * 100) : 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const percent = this.countPositiveFeedbackPercentage();
    const total = this.countTotalFeedback();

    return (
      <div className={styles.container}>
        <Section title="Please leave Feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.handleFeedback}
          />
        </Section>

        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={percent}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </div>
    );
  }
}

export default App;

/* 
Приложение должно отображать количество собранных отзывов для каждой 
категории. Приложение не должно сохранять статистику отзывов между 
разными сессиями (обновление страницы).

Расширь функционал приложения так, чтобы в интерфейсе отображалось 
больше статистики о собранных отзывах. Добавь отображение общего 
количества собранных отзывов из всех категорий и процент 
положительных отзывов. Для этого создай вспомогательные методы 
countTotalFeedback() и countPositiveFeedbackPercentage(), 
подсчитывающие эти значения основываясь на данных в состоянии 
(вычисляемые данные).

Оберни каждый из <Statistics> и <FeedbackOptions> в созданный компонент секции.

Расширь функционал приложения так, чтобы блок статистики рендерился 
только после того, как был собран хотя бы один отзыв. 
Сообщение об отсутствиии статистики вынеси в компонент 
<Notification message="No feedback given">.
*/
