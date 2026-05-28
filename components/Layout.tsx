import { type ReactNode } from 'react';
import Navbar from './NavBar';
import FingerNav from './FingerNav';

interface LayoutProps {
  children: ReactNode;
  activeView: string;
  onNavigate: (viewId: string) => void;
}

export default function Layout({ children, activeView, onNavigate }: LayoutProps) {
  return (
    <div className="app-layout">
      <Navbar currentView={activeView} onNavigate={onNavigate} />
      <FingerNav onNavigate={onNavigate} />
      <div className="main-container">
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
