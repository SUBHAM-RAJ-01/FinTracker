import styles from '../styles/Footer.module.css';
import { Github, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        <a href="https://github.com/SUBHAM-RAJ-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github size={22} />
        </a>
        <a href="https://www.linkedin.com/in/subham-raj-7b11a6350" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={22} />
        </a>
        <a href="https://subhamport.netlify.app" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
          <Globe size={22} />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Subham Raj. All rights reserved.</p>
    </footer>
  );
}
