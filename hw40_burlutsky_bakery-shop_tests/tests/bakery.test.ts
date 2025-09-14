import {
    addCategory,
    allCategoriesExist,
    getCategories,
    isCategoryExists,
    removeCategory
} from "../src/firebase/firebaseDBService";
import {deleteApp} from 'firebase/app';
import {app} from "../src/configurations/firebase-config";
import {firstValueFrom} from "rxjs";
import {arraysEqualByKey} from "../src/utils/tools";


describe('BakeryShop tests', () => {

    const referenceCategories = [
        {categoryName: 'biscuits'},
        {categoryName: 'bread'},
        {categoryName: 'cake'},
        {categoryName: 'croissants'},
        {categoryName: 'pizza'},
        {categoryName: 'pretzels'},
        {categoryName: 'sweets'}
    ];

    afterAll(async () => {
        await deleteApp(app);
    });

    test('Test:firebaseDbService.isCategoryExists', () => {
        expect(isCategoryExists('bread')).resolves.toBeTruthy();
        expect(isCategoryExists('milk')).resolves.toBeFalsy();
    });

    test('Test:firebaseDbService.getCategories', async () => {
        const categories = await firstValueFrom(getCategories());
        expect(
            arraysEqualByKey(
                categories,
                referenceCategories,
                (item) => item.categoryName
            )
        ).toBeTruthy();
    });

    test('Test:firebaseDbService.allCategoriesExist', async () => {
        await expect(allCategoriesExist(referenceCategories)).resolves.toBeTruthy();
        const categories = [
            {categoryName: 'milk'},
            {categoryName: 'bread'}
        ];
        await expect(allCategoriesExist(categories)).resolves.toBeFalsy();
    });

    test('Test:firebaseDbService.removeCategory & addCategory', async () => {
        await removeCategory('bread');
        await expect(allCategoriesExist(referenceCategories)).resolves.toBeFalsy();
        await addCategory({categoryName: 'bread'});
        await expect(allCategoriesExist(referenceCategories)).resolves.toBeTruthy();
    });
});