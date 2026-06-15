"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Jersey } from "@/lib/data";

export default function InventoryPage() {
  const { inventory, addJersey, updateJersey, deleteJersey } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Basic form state
  const defaultForm = {
    name: "",
    team: "",
    league: "",
    price: "",
    badge: "⚽",
    year: "2025/26",
    tag: "new",
    color1: "#ffffff",
    color2: "#000000",
    image: "",
    gallery: [] as string[],
    category: "",
    stockS: 10,
    stockM: 10,
    stockL: 10,
    stockXL: 10,
    stockXXL: 10
  };
  const [formData, setFormData] = useState(defaultForm);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(defaultForm);
    setIsModalOpen(true);
  };

  const openEditModal = (jersey: Jersey) => {
    setEditingId(jersey.id);
    setFormData({
      name: jersey.name,
      team: jersey.team,
      league: jersey.league,
      price: jersey.price.toString(),
      badge: jersey.badge,
      year: jersey.year,
      tag: jersey.tag || "new",
      color1: jersey.colors[0],
      color2: jersey.colors[1],
      image: jersey.image || "",
      gallery: jersey.gallery || [],
      category: jersey.category || "",
      stockS: jersey.stock?.S ?? 0,
      stockM: jersey.stock?.M ?? 0,
      stockL: jersey.stock?.L ?? 0,
      stockXL: jersey.stock?.XL ?? 0,
      stockXXL: jersey.stock?.XXL ?? 0
    });
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'number' ? parseInt(value) || 0 : value 
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, reader.result as string] }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jerseyData: Partial<Jersey> = {
      name: formData.name,
      team: formData.team,
      league: formData.league,
      price: parseInt(formData.price as string) || 1499,
      badge: formData.badge,
      year: formData.year,
      tag: formData.tag as any,
      colors: [formData.color1, formData.color2],
      image: formData.image || undefined,
      gallery: formData.gallery.length > 0 ? formData.gallery : undefined,
      category: formData.category || undefined,
      stock: {
        S: formData.stockS,
        M: formData.stockM,
        L: formData.stockL,
        XL: formData.stockXL,
        XXL: formData.stockXXL
      }
    };

    if (editingId) {
      updateJersey(editingId, jerseyData);
    } else {
      const newJersey: Jersey = {
        id: Math.random().toString(36).substr(2, 9),
        ...(jerseyData as any)
      };
      addJersey(newJersey);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: '2rem' }}>Inventory Management</h1>
        <button className="neo-btn neo-btn--primary" onClick={openAddModal}>
          <Plus size={18} /> Add Jersey
        </button>
      </div>

      <div className="neo-card" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--neo-black)', color: 'var(--neo-white)' }}>
              <th style={{ padding: 'var(--space-md)' }}>Visual</th>
              <th style={{ padding: 'var(--space-md)' }}>Name / Category</th>
              <th style={{ padding: 'var(--space-md)' }}>Team / League</th>
              <th style={{ padding: 'var(--space-md)' }}>Stock</th>
              <th style={{ padding: 'var(--space-md)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const totalStock = Object.values(item.stock || {}).reduce((a, b) => a + b, 0);
              return (
                <tr key={item.id} style={{ borderBottom: '2px solid var(--neo-black)' }}>
                  <td style={{ padding: 'var(--space-md)' }}>
                    {item.image ? (
                      <div style={{ width: 40, height: 40, border: '2px solid var(--neo-black)', borderRadius: '4px', overflow: 'hidden', background: 'var(--neo-white)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`, border: '2px solid var(--neo-black)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                        {item.badge}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: 'var(--space-md)' }}>
                    <div style={{ fontWeight: 700 }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.category || "Uncategorized"}</div>
                  </td>
                  <td style={{ padding: 'var(--space-md)' }}>
                    <div>{item.team}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.league}</div>
                  </td>
                  <td style={{ padding: 'var(--space-md)' }}>
                    <div style={{ fontWeight: 800 }}>{totalStock} units</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>S:{item.stock?.S || 0} M:{item.stock?.M || 0} L:{item.stock?.L || 0}</div>
                  </td>
                  <td style={{ padding: 'var(--space-md)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                      <button className="neo-btn neo-btn--small neo-btn--outline" onClick={() => openEditModal(item)}>
                        <Edit2 size={14} />
                      </button>
                      <button className="neo-btn neo-btn--small neo-btn--pink" onClick={() => deleteJersey(item.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Jersey Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="jersey-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-md)' }}>
            <motion.div 
              className="neo-card" 
              style={{ background: 'var(--neo-white)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 style={{ marginBottom: 'var(--space-lg)' }}>{editingId ? "Edit Jersey" : "Add New Jersey"}</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="neo-label">Name</label>
                    <input type="text" name="name" className="neo-input" placeholder="e.g. Home Kit 2025/26" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="neo-label">Price (₹)</label>
                    <input type="text" name="price" className="neo-input" placeholder="1499" required value={formData.price} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="neo-label">Team</label>
                    <input type="text" name="team" className="neo-input" placeholder="e.g. Real Madrid" required value={formData.team} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="neo-label">League</label>
                    <input type="text" name="league" className="neo-input" placeholder="e.g. La Liga" required value={formData.league} onChange={handleChange} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
                  <div>
                    <label className="neo-label">Main Image Upload</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ flex: 1 }} />
                      {formData.image && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                          <img src={formData.image} alt="Preview" style={{ width: 40, height: 40, objectFit: 'contain', border: '2px solid var(--neo-black)', borderRadius: '4px', background: 'var(--neo-white)' }} />
                          <button type="button" className="neo-btn neo-btn--small neo-btn--pink" onClick={() => setFormData({ ...formData, image: '' })}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="neo-label">Gallery Upload</label>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} style={{ width: '100%' }} />
                    {formData.gallery && formData.gallery.length > 0 && (
                      <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-xs)', flexWrap: 'wrap' }}>
                        {formData.gallery.map((g, idx) => (
                          <div key={idx} style={{ position: 'relative' }}>
                            <img src={g} alt={`Gallery ${idx}`} style={{ width: 40, height: 40, objectFit: 'contain', border: '2px solid var(--neo-black)', borderRadius: '4px', background: 'var(--neo-white)' }} />
                            <button type="button" onClick={() => removeGalleryImage(idx)} style={{ position: 'absolute', top: -5, right: -5, background: 'var(--neo-pink)', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', width: 16, height: 16, fontSize: '10px' }}>×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="neo-label">Category</label>
                    <input type="text" name="category" className="neo-input" placeholder="e.g. Men's, Retro" value={formData.category} onChange={handleChange} />
                  </div>
                </div>

                {/* Stock Editor */}
                <div className="neo-card" style={{ background: 'var(--neo-mint)', padding: 'var(--space-md)' }}>
                  <h3 style={{ marginBottom: 'var(--space-sm)' }}>Inventory Stock (Units)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-sm)' }}>
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <div key={sz}>
                        <label className="neo-label" style={{ fontSize: '0.8rem' }}>Size {sz}</label>
                        <input type="number" name={`stock${sz}`} className="neo-input" value={(formData as any)[`stock${sz}`]} onChange={handleChange} min={0} />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)', opacity: formData.image ? 0.5 : 1 }}>
                  <div>
                    <label className="neo-label">Color 1 (Fallback)</label>
                    <input type="color" name="color1" className="neo-input" value={formData.color1} style={{ padding: '2px', height: '40px' }} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="neo-label">Color 2 (Fallback)</label>
                    <input type="color" name="color2" className="neo-input" value={formData.color2} style={{ padding: '2px', height: '40px' }} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="neo-label">Badge Emoji</label>
                    <input type="text" name="badge" className="neo-input" value={formData.badge} onChange={handleChange} required />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                  <button type="submit" className="neo-btn neo-btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
                    {editingId ? "Save Changes" : "Save Jersey"}
                  </button>
                  <button type="button" className="neo-btn neo-btn--outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
