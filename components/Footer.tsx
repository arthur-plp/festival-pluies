export default function Footer() {
    return (
        <footer className="border-t border-[var(--border)] py-6 mt-auto">
            <div className="container mx-auto px-4 text-center text-[var(--muted-foreground)] text-sm">
            © {new Date().getFullYear()} Les Pluies de Juillet - Tous droits réservés
            </div>
        </footer>
    );
}