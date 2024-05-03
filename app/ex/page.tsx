import Link from 'next/link';

const ExamPage = () => {
  return (
    <div>
      <Link href="hi">
        <div>커뮤니티</div>
      </Link>
      <Link href="hi/hihi">
        <div>상대방 프로필</div>
      </Link>
    </div>
  );
};
export default ExamPage;
