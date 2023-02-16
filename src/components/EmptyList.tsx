import styles from './EmptyLis.module.css';
import clipboard from '../assets/clipboard.svg'

export function EmptyList() {
  return (
    <div className={styles.empty}>
      <img src={clipboard} alt="Prancheta" />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}