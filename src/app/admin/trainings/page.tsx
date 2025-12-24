'use client';

import { useState, useEffect, useRef } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Training {
    id?: string;
    trainingId: string;
    title: string;
    shortDescription: string;
    summary: string;
    detailedDescription: string;
    duration: string;
    targetAudience: string;
    catalogUrl?: string;
}

const InputField = ({ label, value, onChange, required = false, type = 'text', placeholder = '' }: any) => (
    <div>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
            {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </label>
        <input
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-background)',
                color: 'var(--color-text-primary)',
                fontSize: '14px',
                transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
        />
    </div>
);

const RichTextEditor = ({ value, onChange }: { value: string; onChange: (html: string) => void }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && editorRef.current) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value, mounted]);

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    if (!mounted) return null;

    return (
        <div>
            {/* Toolbar */}
            <div style={{
                display: 'flex',
                gap: '4px',
                padding: '8px',
                background: 'var(--color-surface)',
                borderRadius: '8px 8px 0 0',
                border: '1px solid var(--color-border)',
                borderBottom: 'none',
                flexWrap: 'wrap',
            }}>
                <button type="button" onClick={() => execCommand('bold')} style={toolbarButtonStyle} title="Bold">
                    <strong>B</strong>
                </button>
                <button type="button" onClick={() => execCommand('italic')} style={toolbarButtonStyle} title="Italic">
                    <em>I</em>
                </button>
                <button type="button" onClick={() => execCommand('underline')} style={toolbarButtonStyle} title="Underline">
                    <u>U</u>
                </button>

                <div style={{ width: '1px', background: 'var(--color-border)', margin: '0 4px' }} />

                <select onChange={(e) => execCommand('formatBlock', e.target.value)} style={selectStyle}>
                    <option value="">Style</option>
                    <option value="p">Normal</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                </select>

                <select onChange={(e) => execCommand('fontSize', e.target.value)} style={selectStyle}>
                    <option value="">Size</option>
                    <option value="1">Small</option>
                    <option value="3">Normal</option>
                    <option value="5">Large</option>
                    <option value="7">Huge</option>
                </select>

                <div style={{ width: '1px', background: 'var(--color-border)', margin: '0 4px' }} />

                <button type="button" onClick={() => execCommand('insertUnorderedList')} style={toolbarButtonStyle} title="Bullet List">
                    • List
                </button>
                <button type="button" onClick={() => execCommand('insertOrderedList')} style={toolbarButtonStyle} title="Numbered List">
                    1. List
                </button>

                <div style={{ width: '1px', background: 'var(--color-border)', margin: '0 4px' }} />

                <button type="button" onClick={() => execCommand('justifyLeft')} style={toolbarButtonStyle} title="Align Left">
                    ⬅
                </button>
                <button type="button" onClick={() => execCommand('justifyCenter')} style={toolbarButtonStyle} title="Align Center">
                    ↔
                </button>
                <button type="button" onClick={() => execCommand('justifyRight')} style={toolbarButtonStyle} title="Align Right">
                    ➡
                </button>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                style={{
                    minHeight: '400px',
                    padding: '16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0 0 8px 8px',
                    background: 'var(--color-background)',
                    color: 'var(--color-text-primary)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    outline: 'none',
                }}
                suppressContentEditableWarning
            />
        </div>
    );
};

const toolbarButtonStyle: React.CSSProperties = {
    padding: '6px 12px',
    background: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    color: 'var(--color-text-primary)',
    transition: 'all 0.2s',
};

const selectStyle: React.CSSProperties = {
    padding: '6px 8px',
    background: 'var(--color-background)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    color: 'var(--color-text-primary)',
};

export default function AdminTrainings() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTraining, setCurrentTraining] = useState<Training>({
        trainingId: '',
        title: '',
        shortDescription: '',
        summary: '',
        detailedDescription: '',
        duration: '',
        targetAudience: '',
    });
    const [catalogFile, setCatalogFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'trainings'));
            const trainingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Training[];
            setTrainings(trainingsData);
        } catch (error) {
            console.error('Error fetching trainings:', error);
            alert('Error: ' + (error as any).message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('Starting save...', currentTraining);
            let catalogUrl = currentTraining.catalogUrl;

            if (catalogFile) {
                console.log('Uploading catalog file...');
                const storageRef = ref(storage, `catalogs/${currentTraining.trainingId}_${catalogFile.name}`);
                await uploadBytes(storageRef, catalogFile);
                catalogUrl = await getDownloadURL(storageRef);
                console.log('Catalog uploaded:', catalogUrl);
            }

            const trainingData: any = {
                trainingId: currentTraining.trainingId,
                title: currentTraining.title,
                shortDescription: currentTraining.shortDescription,
                summary: currentTraining.summary,
                detailedDescription: currentTraining.detailedDescription || '',
                duration: currentTraining.duration,
                targetAudience: currentTraining.targetAudience,
                updatedAt: new Date().toISOString(),
            };

            // Only include catalogUrl if it exists
            if (catalogUrl) {
                trainingData.catalogUrl = catalogUrl;
            }

            console.log('Saving to Firestore...', trainingData);

            if (isEditing && currentTraining.id) {
                console.log('Updating document:', currentTraining.id);

                // Add timeout
                const updatePromise = updateDoc(doc(db, 'trainings', currentTraining.id), trainingData);
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Update timed out after 10 seconds')), 10000)
                );

                await Promise.race([updatePromise, timeoutPromise]);
                console.log('Update successful!');
                alert('Training updated successfully!');
            } else {
                console.log('Adding new document...');

                // Add timeout
                const addPromise = addDoc(collection(db, 'trainings'), {
                    ...trainingData,
                    createdAt: new Date().toISOString(),
                });
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Write timed out after 10 seconds. This usually means Firestore rules are blocking the write.')), 10000)
                );

                const docRef: any = await Promise.race([addPromise, timeoutPromise]);
                console.log('Document added with ID:', docRef.id);
                alert('Training added successfully!');
            }

            resetForm();
            fetchTrainings();
            setShowForm(false);
        } catch (error) {
            console.error('Error saving training:', error);
            alert('Failed to save: ' + (error as any).message + '\n\nCheck browser console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (training: Training) => {
        setCurrentTraining(training);
        setIsEditing(true);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this training?')) return;

        try {
            await deleteDoc(doc(db, 'trainings', id));
            alert('Training deleted successfully!');
            fetchTrainings();
        } catch (error) {
            console.error('Error deleting training:', error);
            alert('Failed to delete training');
        }
    };

    const resetForm = () => {
        setCurrentTraining({
            trainingId: '',
            title: '',
            shortDescription: '',
            summary: '',
            detailedDescription: '',
            duration: '',
            targetAudience: '',
        });
        setCatalogFile(null);
        setIsEditing(false);
    };

    const fillTestData = () => {
        setCurrentTraining({
            trainingId: 'TRN-' + Math.floor(Math.random() * 1000),
            title: '7 Habits of Highly Effective People',
            shortDescription: 'Transform your personal and professional effectiveness',
            summary: 'Learn the timeless principles of effectiveness that have helped millions achieve their goals',
            detailedDescription: `<h2>Program Overview</h2>
<p>This transformative program is based on Stephen Covey's groundbreaking book, teaching participants the seven habits that lead to personal and professional effectiveness.</p>

<h3>Key Learning Outcomes</h3>
<ul>
  <li><b>Be Proactive</b> - Take responsibility for your life and choices</li>
  <li><b>Begin with the End in Mind</b> - Define clear goals and vision</li>
  <li><b>Put First Things First</b> - Prioritize what matters most</li>
  <li><b>Think Win-Win</b> - Seek mutually beneficial solutions</li>
  <li><b>Seek First to Understand</b> - Practice empathetic listening</li>
  <li><b>Synergize</b> - Collaborate for better results</li>
  <li><b>Sharpen the Saw</b> - Continuous self-renewal</li>
</ul>

<h3>Who Should Attend</h3>
<p>This program is ideal for leaders, managers, and professionals who want to enhance their effectiveness and achieve sustainable results.</p>`,
            duration: '2 days',
            targetAudience: 'Leaders, Managers, Professionals',
        });
        alert('✅ Test data filled! You can now click "Add Training" to save.');
    };

    return (
        <div className="main-wrapper" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', background: 'var(--color-background)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1 className="heading-1" style={{ fontSize: '32px', marginBottom: '4px' }}>
                            Training Programs
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Manage your training catalog
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showForm) resetForm();
                        }}
                        className="btn btn-primary"
                        style={{ padding: '12px 24px', fontSize: '14px' }}
                    >
                        {showForm ? '✕ Close' : '+ New Training'}
                    </button>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        backdropFilter: 'blur(4px)',
                    }}>
                        <div style={{
                            background: 'var(--color-background)',
                            borderRadius: '16px',
                            maxWidth: '1100px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        }}>
                            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--color-background)', zIndex: 10 }}>
                                <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
                                    {isEditing ? 'Edit Training' : 'Add New Training'}
                                </h2>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={fillTestData}
                                            style={{
                                                padding: '8px 16px',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                borderRadius: '6px',
                                                border: '1px solid var(--color-accent)',
                                                background: 'transparent',
                                                color: 'var(--color-accent)',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--color-accent)';
                                                e.currentTarget.style.color = '#ffffff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = 'var(--color-accent)';
                                            }}
                                        >
                                            🎲 Fill Test Data
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { setShowForm(false); resetForm(); }}
                                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <InputField
                                        label="Training ID"
                                        required
                                        value={currentTraining.trainingId}
                                        onChange={(e: any) => setCurrentTraining({ ...currentTraining, trainingId: e.target.value })}
                                        placeholder="e.g., TRN-001"
                                    />
                                    <InputField
                                        label="Duration"
                                        required
                                        value={currentTraining.duration}
                                        onChange={(e: any) => setCurrentTraining({ ...currentTraining, duration: e.target.value })}
                                        placeholder="e.g., 2 days"
                                    />
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <InputField
                                        label="Title"
                                        required
                                        value={currentTraining.title}
                                        onChange={(e: any) => setCurrentTraining({ ...currentTraining, title: e.target.value })}
                                        placeholder="Training program title"
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                                    <InputField
                                        label="Short Description"
                                        required
                                        value={currentTraining.shortDescription}
                                        onChange={(e: any) => setCurrentTraining({ ...currentTraining, shortDescription: e.target.value })}
                                        placeholder="Brief tagline"
                                    />
                                    <InputField
                                        label="Summary"
                                        required
                                        value={currentTraining.summary}
                                        onChange={(e: any) => setCurrentTraining({ ...currentTraining, summary: e.target.value })}
                                        placeholder="Program summary"
                                    />
                                </div>

                                {/* Rich Text Editor */}
                                <div style={{ marginTop: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                                        Detailed Description <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                        💡 Use the toolbar to format text. Paste from MS Word works too!
                                    </div>
                                    <RichTextEditor
                                        value={currentTraining.detailedDescription}
                                        onChange={(html) => setCurrentTraining({ ...currentTraining, detailedDescription: html })}
                                    />
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <InputField
                                        label="Target Audience"
                                        required
                                        value={currentTraining.targetAudience}
                                        onChange={(e: any) => setCurrentTraining({ ...currentTraining, targetAudience: e.target.value })}
                                        placeholder="e.g., Senior Executives, Managers"
                                    />
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                                        Catalog (PDF)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setCatalogFile(e.target.files?.[0] || null)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-border)',
                                            background: 'var(--color-background)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: '14px',
                                        }}
                                    />
                                    {currentTraining.catalogUrl && (
                                        <a
                                            href={currentTraining.catalogUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: 'inline-block', marginTop: '8px', color: 'var(--color-accent)', fontSize: '13px' }}
                                        >
                                            📄 View current catalog
                                        </a>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--color-border)', position: 'sticky', bottom: 0, background: 'var(--color-background)' }}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary"
                                        style={{ flex: 1, padding: '12px' }}
                                    >
                                        {loading ? 'Saving...' : isEditing ? 'Update Training' : 'Add Training'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowForm(false); resetForm(); }}
                                        className="btn btn-outline"
                                        style={{ flex: 1, padding: '12px' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Training Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
                    {trainings.map((training) => (
                        <div
                            key={training.id}
                            style={{
                                background: 'var(--color-surface)',
                                borderRadius: '12px',
                                padding: '24px',
                                border: '1px solid var(--color-border)',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {training.trainingId}
                                    </div>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', lineHeight: '1.3' }}>
                                        {training.title}
                                    </h3>
                                </div>
                            </div>

                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                                {training.shortDescription}
                            </p>

                            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '12px' }}>
                                <div>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>⏱ </span>
                                    <span style={{ fontWeight: '500' }}>{training.duration}</span>
                                </div>
                                <div>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>👥 </span>
                                    <span style={{ fontWeight: '500' }}>{training.targetAudience}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                                <button
                                    onClick={() => handleEdit(training)}
                                    style={{
                                        flex: 1,
                                        padding: '8px 12px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        borderRadius: '6px',
                                        border: '1px solid var(--color-border)',
                                        background: 'transparent',
                                        color: 'var(--color-text-primary)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-surface-hover)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                    }}
                                >
                                    Edit
                                </button>
                                {training.catalogUrl && (
                                    <a
                                        href={training.catalogUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            flex: 1,
                                            padding: '8px 12px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            borderRadius: '6px',
                                            border: '1px solid var(--color-border)',
                                            background: 'transparent',
                                            color: 'var(--color-text-primary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'center',
                                            textDecoration: 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--color-surface-hover)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        📄 PDF
                                    </a>
                                )}
                                <button
                                    onClick={() => training.id && handleDelete(training.id)}
                                    style={{
                                        padding: '8px 12px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        borderRadius: '6px',
                                        border: '1px solid #dc2626',
                                        background: 'transparent',
                                        color: '#dc2626',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#dc2626';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#dc2626';
                                    }}
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {trainings.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        color: 'var(--color-text-secondary)',
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                        border: '2px dashed var(--color-border)',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--color-text-primary)' }}>No trainings yet</h3>
                        <p style={{ fontSize: '14px' }}>Click "New Training" to add your first program</p>
                    </div>
                )}
            </div>
        </div>
    );
}
