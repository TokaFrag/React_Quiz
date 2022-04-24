import {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
	state = {
		results: {},
		activeQuestion: 0,
		isFinished: false,
		answerState: null,
		quiz: [
			{
				question: 'Какого цвета небо?',
				id: 1,
				rightAnswerId: 2,
				answers: [
					{text: 'Черное', id: 1},
					{text: 'Синее', id: 2},
					{text: 'Красное', id: 3},
					{text: 'Зеленое', id: 4},
				]
			},
			{
				question: 'В каком году основали Санкт-Петербург?',
				id: 2,
				rightAnswerId: 3,
				answers: [
					{text: '1700', id: 1},
					{text: '1702', id: 2},
					{text: '1703', id: 3},
					{text: '1803', id: 4},
				]
			},
			{
				question: 'В каком году основали Екатеринбург?',
				id: 3,
				rightAnswerId: 1,
				answers: [
					{text: '1723', id: 1},
					{text: '1724', id: 2},
					{text: '1714', id: 3},
					{text: '1773', id: 4},
				]
			}
		]
	}
	isQuizFinished = () => {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	onAnswerClickHandler = answerId => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return
			}
		}

		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results

		if (question.rightAnswerId === answerId) {
			results[question.id] = 'success'

			this.setState({
				answerState: {[answerId]: 'success'},
				results,
			})

			const timeout = setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				clearTimeout(timeout)
			}, 500)
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: {[answerId]: 'error'},
				results
			})

			const timeout = setTimeout(() => {
				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				clearTimeout(timeout)
			}, 500)
		}
	}

	retryHandler = () => {
		this.setState({
			activeQuestion: 0,
			isFinished: false,
			answerState: null,
			results: {}
		})
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					{
						this.state.isFinished
							? <FinishedQuiz
								results={this.state.results}
								quiz={this.state.quiz}
								onRetry={this.retryHandler}
							/>
							: <ActiveQuiz
								answers={this.state.quiz[this.state.activeQuestion].answers}
								question={this.state.quiz[this.state.activeQuestion].question}
								onAnswerClick={this.onAnswerClickHandler}
								quizLength={this.state.quiz.length}
								answerNumber={this.state.activeQuestion + 1}
								state={this.state.answerState}
							/>
					}

				</div>
			</div>
		)
	}
}

export default Quiz;