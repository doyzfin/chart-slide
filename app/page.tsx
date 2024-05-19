import dynamic from 'next/dynamic';

const SlidingChart = dynamic(() => import('./slidingChart'), { ssr: false });

function generateDataForMonth(year: number, month: number) {
  const data = [];
  const startDate = new Date(year, month - 1, 1); // Bulan dalam JavaScript adalah 0-indexed

  while (startDate.getMonth() === month - 1) {
    data.push({
      date: startDate.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 100) + 1, // Nilai acak antara 1 dan 100
    });
    startDate.setDate(startDate.getDate() + 1);
  }

  return data;
}

const data = generateDataForMonth(2024, 5); // Menghasilkan data untuk Januari 2023

const HomePage = () => {
  return (
    <div>
      <h1>My Sliding Chart</h1>
      <SlidingChart data={data} />
    </div>
  );
};

export default HomePage;
