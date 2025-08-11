// The main content wrapper
// Handles responsive layout and spacing

export function PageLayout({ children, className = "" }) {
    return (
        <main className={`flex-1 bg-gray-50 ${className}`}>
            <div className="container mx-auto py-6 sm:py-8 lg:py-12">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </div>
        </main>
    );
}

export default PageLayout;
