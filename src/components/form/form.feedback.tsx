interface FormFeedbackProps {
    message?: string;
}

const formFeedback = ({ message }: FormFeedbackProps) => {
    return message ? <div>{message}</div> : null;
}

export default formFeedback;