function SkillList() {
    const skills = ['HTML', 'CSS', 'JavaScript Modern', 'React', 'Node.js'];

    return (
        <div className="card">
            <h3>Daftar Materi Keahlian</h3>
            <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}
export default SkillList;