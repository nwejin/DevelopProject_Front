import '../styles/global.scss';
import { Metadata } from 'next';
import Header from '../components/header';
import Footer from '../components/footer';
import { Providers } from '../Store/provider';

export const metadata: Metadata = {
  title: {
    template: 'project',
    default: 'ogg',
  },
  description: '당신만의 옷장을 만들어 편하게 관리해보세요!',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Header />
          <div className="mainContainer">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
