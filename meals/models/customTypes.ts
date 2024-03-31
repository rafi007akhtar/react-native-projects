import { RouteProp, ParamListBase } from "@react-navigation/native";
import Meal from "./meal";
import Category from "./category";

export interface MealItemProps {
  meal: Meal;
  categoryData: Category;
}

export interface CategoriesProps {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}

export interface MealDetailsProps {
  route: RouteProp<ParamListBase, "MealDetails">;
  navigation: any;
}

export interface TitleProps {
  children?: any;
  headerLevel?: number;
}
