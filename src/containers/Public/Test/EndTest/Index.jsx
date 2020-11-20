import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { CSSTransition } from "react-transition-group"
import { connect } from "react-redux"
import { Col, Row } from "react-bootstrap"

import classes from "scss/Public/Test.module.scss"
const QuestionSAndAnswers = props => {
    const [ShowDescription, setShowDescription] = useState(false)
    
    const classNameShowDescription = {
        enter: classes.enterShowDescription,
        enterActive: classes.enterActiveShowDescription,
        exit: classes.exitShowDescription,
        exitActive: classes.exitActiveShowDescription
    }
    const onShowDescription = () => {
        setShowDescription(!ShowDescription)
    }
    return (
        <div className={classes.TestEndStep}>
            <div className={classes.QuestionSAndAnswers}>
                end Step
                {props.questionStore.map((item, index) => {
                    return (
                        <div
                            className={classes.question}
                            onClick={onShowDescription}
                            key={index}
                        >
                            <p className={classes.questionText}>
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className={`${
                                        ShowDescription
                                            ? classes.arrowIconDown
                                            : classes.arrowIconLeft
                                    } ${classes.arrowIcon}`}
                                />
                                {item.question}
                            </p>
                            <CSSTransition
                                in={ShowDescription}
                                classNames={classNameShowDescription}
                                mountOnEnter
                                unmountOnExit
                                timeout={300}
                            >
                                <div>
                                    <div className={classes.answer}>
                                        <p>
                                            {
                                                JSON.parse(item.options)[
                                                    props.answersStore[index]
                                                        .answer_id - 1
                                                ].answer
                                            }
                                        </p>
                                    </div>
                                    <div className={classes.description}>
                                        <span>توضیحات:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: item.description
                                            }}
                                        ></p>
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
const mapStatesToProps = state => {
    return {
        questionStore: state.Test.question,
        answersStore: state.Test.answers
    }
}

const mapActionToProps = dispatch => {
    return {}
}
export default connect(mapStatesToProps, mapActionToProps)(QuestionSAndAnswers)
