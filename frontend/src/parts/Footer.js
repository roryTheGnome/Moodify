function Footer() {
    return (
        <footer className="footer">
            <p>Built with ☕</p>
            <p>
                © {new Date().getFullYear()} <strong>Moodify</strong> by <a href="https://github.com/roryTheGnome">Gnome</a>
            </p>
        </footer>
    );
}

export default Footer;
