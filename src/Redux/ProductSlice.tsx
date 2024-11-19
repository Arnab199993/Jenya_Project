import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  rating?: number;
}

interface ProductState {
  data: ProductItem[];
  loading: boolean;
  error: string | null;
  singleProductData: ProductItem[];
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
  singleProductData: [],
};

export const fetchProducts = createAsyncThunk<ProductItem[]>(
  "product/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const result = await response.json();
    return result.products;
  }
);

export const singleProductView = createAsyncThunk<ProductItem, string>(
  "product/SingleProduct",
  async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const result = await response.json();
    return result;
  }
);

export const addProduct = createAsyncThunk<ProductItem, ProductItem>(
  "product/addProduct",
  async (newProduct) => {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const result = await response.json();
    return result;
  }
);

export const updateProduct = createAsyncThunk<ProductItem, ProductItem>(
  "product/updateProduct",
  async (updatedProduct) => {
    const response = await fetch(
      `https://dummyjson.com/products/${updatedProduct.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    const result = await response.json();
    return result;
  }
);

export const deleteProduct = createAsyncThunk<number, number>(
  "product/deleteProduct",
  async (productId) => {
    const response = await fetch(
      `https://dummyjson.com/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return productId;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductItem[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });

    builder
      .addCase(singleProductView.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        singleProductView.fulfilled,
        (state, action: PayloadAction<ProductItem[]>) => {
          state.loading = false;
          state.singleProductData = action.payload;
        }
      )
      .addCase(singleProductView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      });

    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<ProductItem>) => {
        state.data.push(action.payload);
      }
    );

    builder.addCase(
      updateProduct.fulfilled,
      (state, action: PayloadAction<ProductItem>) => {
        const index = state.data.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }
    );

    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.data = state.data.filter(
          (product) => product.id !== action.payload
        );
      }
    );
  },
});

export default productSlice.reducer;
