interface MobileMenuButtonProps {
  navbarOpen: boolean;
  onClick: () => void;
}

export function MobileMenuButton({ navbarOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label='Menu'
      className='block md:hidden p-2 relative -mr-2 ml-1'
    >
      <div className="w-7 h-5 flex flex-col justify-between">
        <span 
          className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
            navbarOpen ? 'w-7 rotate-45 translate-y-[0.625rem]' : ''
          }`}
        />
        <span 
          className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
            navbarOpen ? 'opacity-0' : ''
          }`}
        />
        <span 
          className={`block w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
            navbarOpen ? 'w-7 -rotate-45 -translate-y-[0.625rem]' : ''
          }`}
        />
      </div>
    </button>
  );
} 