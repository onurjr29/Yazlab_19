import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  tcKimlikNo: string;
  role: "admin" | "applicant";
}

export default function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    tcKimlikNo: "",
    role: "applicant",
    password: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone || "",
      tcKimlikNo: user.tcKimlikNo,
      role: user.role,
      password: ""
    });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    const res = await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, form);
    if (res.data.warning) {
      alert(res.data.message);
      return;
    }

    setEditingUser(null);
    setForm({ name: "", surname: "", email: "", phone: "", tcKimlikNo: "", role: "applicant", password: "" }); // inputları sıfırla
    fetchUsers();
  };
  
  const handleAddUser = async () => {
    if (!form.name || !form.surname || !form.email || !form.tcKimlikNo || !form.password) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/users", form);
      fetchUsers();
      setForm({ name: "", surname: "", email: "", phone: "", tcKimlikNo: "", role: "applicant", password: "" });
    } catch (err) {
      console.error("Kullanıcı ekleme hatası:", err);
      alert("Kullanıcı eklenemedi.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setForm({ name: "", surname: "", email: "", phone: "", tcKimlikNo: "", role: "applicant", password: "" }); // inputları sıfırla
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <h1 className="text-black text-lg font-semibold">Admin Kullanıcı Yönetimi</h1>
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b bg-blue-gray-50">Ad</th>
                <th className="p-4 border-b bg-blue-gray-50">Soyad</th>
                <th className="p-4 border-b bg-blue-gray-50">E-posta</th>
                <th className="p-4 border-b bg-blue-gray-50">Telefon</th>
                <th className="p-4 border-b bg-blue-gray-50">TC</th>
                <th className="p-4 border-b bg-blue-gray-50">Rol</th>
                <th className="p-4 border-b bg-blue-gray-50">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-4 border-b">{user.name}</td>
                  <td className="p-4 border-b">{user.surname}</td>
                  <td className="p-4 border-b">{user.email}</td>
                  <td className="p-4 border-b">{user.phone || "-"}</td>
                  <td className="p-4 border-b">{user.tcKimlikNo}</td>
                  <td className="p-4 border-b">{user.role}</td>
                  <td className="p-4 border-b space-x-2">
                    <button onClick={() => handleEditClick(user)} className="bg-yellow-500 text-white px-2 py-1 rounded">Düzenle</button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-[20px] shadow-md p-4 gap-6 h-fit flex flex-col">
          <h2 className="text-md font-semibold">Kullanıcı Bilgileri</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-2">
              <label>Ad</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Soyad</label>
              <input type="text" name="surname" value={form.surname} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>E-posta</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Telefon</label>
              <input type="text" name="phone" value={form.phone} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>TC Kimlik No</label>
              <input type="text" name="tcKimlikNo" value={form.tcKimlikNo} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label>Rol</label>
              <select name="role" value={form.role} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg">
                <option value="admin">Admin</option>
                <option value="manager">Yönetici</option>
                <option value="jury">Jüri</option>
                <option value="applicant">Aday</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label>Şifre</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="p-2 border border-gray-300 rounded-lg" />
            </div>
          </div>

          <div className="flex gap-x-4">
            {editingUser ? (
              <>
                <button onClick={handleUpdate} className="bg-black text-white rounded-lg p-2 shadow-md">Güncelle</button>
                <button onClick={handleCancel} className="bg-gray-500 text-white rounded-lg p-2 shadow-md">İptal</button>
              </>
            ) : (
              <button onClick={handleAddUser} className="bg-green-600 text-white rounded-lg p-2 shadow-md">Kullanıcı Ekle</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}