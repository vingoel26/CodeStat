function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: 'white',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 CodeStat</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>
          Coding Profile Dashboard - Coming Soon
        </p>
        <p style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: '2rem' }}>
          Codeforces • CodeChef • LeetCode • AtCoder
        </p>
      </div>
    </div>
  );
}

export default Home;
