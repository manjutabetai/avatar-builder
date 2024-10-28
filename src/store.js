import { create } from 'zustand'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hhxevcpfybcehhdtdron.supabase.co'

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if(!supabaseKey){
  throw new Error('supabaseKeyの取得に失敗')
}
export const supabase = createClient(supabaseUrl, supabaseKey)

export const useConfiguratorStore = create((set) => ({

  categories: [],
  currentCategory:null,
  assets:[],
  customization:{},
  fetchCategories: async () => {
    try {
      console.log('fetchCategories関数が呼び出されました');
  
      console.log('カテゴリーデータの取得を開始します');
      const { data: categories, error: categoryError } = await supabase
        .from('CustomizationGroups')
        .select('*')
        .order("position",{ascending:true})//昇順

  
      const { data: assets, error: assetError } = await supabase
        .from('CustomizationAssets')
        .select('*')
        .order("created_at",{ascending:false})// 降順

        if (categoryError || assetError) {
          console.error("Error fetching data:", categoryError || assetError);
          return;
        }

      const customization = {}
        console.log('categories:' + categories)
      categories.forEach(category => {
        
        //  assetsプロパティに一致するassetを配列で持たせる
        category.assets = assets.filter((asset) => asset.group_id === category.id)
        // 　{Shoes: {}} カテゴリ名をkeyにしてオブジェクトを持つ
        customization[category.name] ={}

        if (category.startingAsset) {
          customization[category.name].asset = category.assets.find(
            (asset) => asset.id === category.startingAsset
          );
        }
      });


      set({ categories, assets, currentCategory: categories[0] ,});
    } catch (error) {
      console.error('データの取得に失敗しました:', error.message);
      console.error('エラーの詳細:', error);
    }
   
  },
  
  setCurrentCategory: (category) => set({ currentCategory:category}),

  changeAsset: (category, asset) =>
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: {
          ...state.customization[category],
          asset,
        },
      },
    })),


}))