function Header({ isDarkMode, toggleTheme }) {
  return (
    <header className="header">
      <h1 className="main-title">🌈 My To-Do List</h1>
      <button className="toggle-btn" onClick={toggleTheme}>
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
