import {useEffect, useState} from "react";
import api from "../api/axios";
import type {Product} from "../types/types";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await api.get<Product[]>("/products");
                setProducts(data);
            } catch (e) {
                setError("Failed to load products");
                console.log(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div style={{padding: 16}}>Loading...</div>;
    if (error) return <div style={{padding: 16, color: "crimson"}}>{error}</div>;

    return (
        <div style={{
            padding: 16,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))"
        }}>
            {products.map((p) => (
                <div key={p.id} style={{border: "1px solid #eee", borderRadius: 8, padding: 12}}>
                    <img src={p.image} alt={p.title}
                         style={{width: "100%", height: 160, objectFit: "contain"}}/>
                    <h4 style={{marginTop: 8}}>{p.title}</h4>
                    <div style={{fontWeight: 700}}>${p.price}</div>
                    <div style={{fontSize: 12, opacity: 0.8}}>{p.category}</div>
                </div>
            ))}
        </div>
    );
}
