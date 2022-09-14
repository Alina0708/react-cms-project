import classes from './Modal.module.css';

const Modal = ({ children, setShow }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <div className={classes.close}>
          <img alt="close" src="https://cdn-icons-png.flaticon.com/512/70/70091.png" onClick={() => setShow(false)} />
        </div>
        <div className={classes.childrens}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
