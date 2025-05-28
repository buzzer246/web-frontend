// app/layout.tsx
import Footer from '@/pages/Footer';
import 'bootstrap/dist/css/bootstrap.css';

export default function index({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Your other components */}
        {children}
        <Footer />
      </body>
    </html>
  );
}