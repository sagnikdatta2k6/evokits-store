import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Jersey, jerseys as initialJerseys, marqueeTeams } from './data';

export interface CartItem {
  id: string; // unique cart item id (e.g., jersey.id + size)
  jersey: Jersey;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  avatar: string; // URL or base64
}

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (jersey: Jersey, size: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: Jersey[];
  toggleWishlist: (jersey: Jersey) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
  processOrder: (order: Order, cartItems: CartItem[]) => void;

  // Inventory (Admin)
  inventory: Jersey[];
  addJersey: (jersey: Jersey) => void;
  updateJersey: (id: string, updates: Partial<Jersey>) => void;
  deleteJersey: (id: string) => void;



  // User Profile
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;

  // Modal State
  selectedJersey: Jersey | null;
  setSelectedJersey: (jersey: Jersey | null) => void;

  // Storefront Settings
  marqueeItems: string[];
  updateMarqueeItems: (items: string[]) => void;
}

const defaultProfile: UserProfile = {
  name: "John Doe",
  username: "johndoe99",
  email: "john@example.com",
  phone: "9876543210",
  address: "123 Football Lane, Sector 4",
  pincode: "700001",
  avatar: "",
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      selectedJersey: null,
      setSelectedJersey: (jersey) => set({ selectedJersey: jersey }),

      marqueeItems: marqueeTeams,
      updateMarqueeItems: (items) => set({ marqueeItems: items }),

      cart: [],
      addToCart: (jersey, size, quantity) => {
        const cart = get().cart;
        const existingItemIndex = cart.findIndex(
          (item) => item.jersey.id === jersey.id && item.size === size
        );

        if (existingItemIndex >= 0) {
          const newCart = [...cart];
          newCart[existingItemIndex].quantity += quantity;
          set({ cart: newCart });
        } else {
          set({
            cart: [...cart, { id: `${jersey.id}-${size}`, jersey, size, quantity }],
          });
        }
      },
      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter((item) => item.id !== cartItemId) });
      },
      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),

      wishlist: [],
      toggleWishlist: (jersey) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((item) => item.id === jersey.id);
        if (exists) {
          set({ wishlist: wishlist.filter((item) => item.id !== jersey.id) });
        } else {
          set({ wishlist: [...wishlist, jersey] });
        }
      },

      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      updateOrderStatus: (orderId, status) => set({
        orders: get().orders.map(o => o.id === orderId ? { ...o, status } : o)
      }),
      cancelOrder: (orderId) => {
        const order = get().orders.find(o => o.id === orderId);
        if (!order || order.status === 'Cancelled') return;

        const currentInventory = get().inventory;
        const updatedInventory = currentInventory.map(jersey => {
          // Find all items in this cancelled order for this specific jersey
          const itemsForJersey = order.items.filter(item => item.jersey.id === jersey.id);
          if (itemsForJersey.length === 0) return jersey;

          // Copy stock
          const newStock = { ...jersey.stock };
          
          // Restore quantities
          itemsForJersey.forEach(item => {
            if (newStock[item.size] !== undefined) {
              newStock[item.size] += item.quantity;
            } else {
              newStock[item.size] = item.quantity;
            }
          });

          return { ...jersey, stock: newStock };
        });

        set({
          orders: get().orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o),
          inventory: updatedInventory,
        });
      },
      processOrder: (order, cartItems) => {
        const currentInventory = get().inventory;
        const updatedInventory = currentInventory.map(jersey => {
          // Find all cart items for this specific jersey
          const itemsForJersey = cartItems.filter(item => item.jersey.id === jersey.id);
          if (itemsForJersey.length === 0) return jersey; // No changes

          // Copy stock
          const newStock = { ...jersey.stock };
          
          // Deduct quantities
          itemsForJersey.forEach(item => {
            if (newStock[item.size] !== undefined) {
              newStock[item.size] = Math.max(0, newStock[item.size] - item.quantity);
            }
          });

          return { ...jersey, stock: newStock };
        });

        set({
          orders: [order, ...get().orders],
          inventory: updatedInventory,
          cart: [] // Clear cart after processing
        });
      },

      inventory: initialJerseys,
      addJersey: (jersey) => set({ inventory: [jersey, ...get().inventory] }),
      updateJersey: (id, updates) => set({
        inventory: get().inventory.map(j => j.id === id ? { ...j, ...updates } : j)
      }),
      deleteJersey: (id) => set({
        inventory: get().inventory.filter(j => j.id !== id)
      }),



      userProfile: defaultProfile,
      updateProfile: (profileUpdates) =>
        set({ userProfile: { ...get().userProfile, ...profileUpdates } }),
    }),
    {
      name: 'evokits-storage', // name of the item in the storage (must be unique)
    }
  )
);
