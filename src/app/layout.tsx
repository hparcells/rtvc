import '../styles/global.scss';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='bp4-dark'>{children}</body>
    </html>
  );
}

export default RootLayout;
