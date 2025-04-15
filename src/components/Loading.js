import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Loading your financial data...</p>
    </div>
  );
};

export default Loading;