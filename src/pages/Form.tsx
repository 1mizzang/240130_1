// pages/form.tsx
import router from 'next/router';
import React, { useState, FormEvent } from 'react';

// 입력 데이터에 대한 타입 정의
interface FormData {
    title: string;
    content: string;
}

const Form: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({ title: '', content: '' });

    // 입력 필드의 값이 변경될 때 호출될 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // 폼의 기본 제출 동작을 방지
         // "저장하시겠습니까?" 대화 상자를 띄우고 사용자의 응답을 확인
    const isConfirmed = window.confirm('저장하시겠습니까?');
    if (!isConfirmed) {
        // 사용자가 "Cancel"을 클릭한 경우, 여기서 함수 실행을 중단
        return;
    }
    
        // 여기서 formData를 사용하여 서버로 제출하는 로직을 구현
        // 서버로 전송
        try {
            const response = await fetch('http://localhost:3001/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Server response was not ok.');
            }
            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.log("submit failed:", error);

        };

        console.log(formData);
        // 예: fetch('/submit-form-url', { method: 'POST', body: JSON.stringify(formData) })
        router.push('/Board');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                제목: <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div>
                내용: <textarea name="content" value={formData.content} onChange={handleChange}></textarea>
            </div>
            <button type="submit">저장</button>
        </form>
    );
};


export default Form;
