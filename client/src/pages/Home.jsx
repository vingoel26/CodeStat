import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>CodeStat</h1>
            <p>Track your competitive programming journey across multiple platforms.</p>

            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>

            <section>
                <h2>Supported Platforms</h2>
                <ul>
                    <li>Codeforces</li>
                    <li>CodeChef</li>
                    <li>LeetCode</li>
                    <li>AtCoder</li>
                </ul>
            </section>
        </div>
    );
}

export default Home;
