// props for form feedback
interface FormFeedbackProps {
    message?: string;
}

// creating the component with message
const formFeedback = ({ message }: FormFeedbackProps) => {
    return message ? <div>{message}</div> : null;
}

export default formFeedback;