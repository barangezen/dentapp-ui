import toast from "react-hot-toast";

const notification = {
    error: (message) => {
        toast.error( t => (
            <span className="d-flex flex-row justify-content-between align-items-center w-100">
                { message }
                <button
                    className="btn btn-outline"
                    onClick={ () => toast.dismiss(t.id) }
                >
                    <i className="fas fa-times"/>
                </button>
            </span>
        ));
    },
    success: (message) => {
        toast.success( t => (
            <span className="d-flex flex-row justify-content-between align-items-center w-100">
                { message }
                <button
                    className="btn btn-outline"
                    onClick={ () => toast.dismiss(t.id) }
                >
                    <i className="fas fa-times"/>
                </button>
            </span>
        ));
    }
};

export default notification;
