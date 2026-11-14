import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ margin: '20px 0' }}>
            <h3>Komponen Hitungan: {count}</h3>
            <button className="btn-utama" onClick={() => setCount(count + 1)}>
                Tambah Angka
            </button>
        </div>
    );
}

export default Counter;