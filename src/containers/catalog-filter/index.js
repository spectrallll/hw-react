import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import OptionTree from "../../components/option-tree";

const array = [
  {
    "_id": "6477698510d1060c910cbb59",
    "title": "Электроника",
    "parent": null,
    "children": [
      {
        "_id": "6477698510d1060c910cbb5a",
        "title": "Телефоны",
        "parent": {
          "_id": "6477698510d1060c910cbb59"
        },
        "children": [
          {
            "_id": "6477698510d1060c910cbb61",
            "title": "Смартфоны",
            "parent": {
              "_id": "6477698510d1060c910cbb5a"
            },
            "children": []
          },
          {
            "_id": "6477698510d1060c910cbb62",
            "title": "Аксессуары",
            "parent": {
              "_id": "6477698510d1060c910cbb5a"
            },
            "children": []
          }
        ]
      },
      {
        "_id": "6477698510d1060c910cbb5b",
        "title": "Ноутбуки",
        "parent": {
          "_id": "6477698510d1060c910cbb59"
        },
        "children": []
      },
      {
        "_id": "6477698510d1060c910cbb5c",
        "title": "Телевизоры",
        "parent": {
          "_id": "6477698510d1060c910cbb59"
        },
        "children": []
      }
    ]
  },
  {
    "_id": "6477698510d1060c910cbb5d",
    "title": "Книги",
    "parent": null,
    "children": [
      {
        "_id": "6477698510d1060c910cbb5e",
        "title": "Учебники",
        "parent": {
          "_id": "6477698510d1060c910cbb5d"
        },
        "children": []
      },
      {
        "_id": "6477698510d1060c910cbb5f",
        "title": "Художественная",
        "parent": {
          "_id": "6477698510d1060c910cbb5d"
        },
        "children": []
      },
      {
        "_id": "6477698510d1060c910cbb60",
        "title": "Комиксы",
        "parent": {
          "_id": "6477698510d1060c910cbb5d"
        },
        "children": []
      }
    ]
  }
];
function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    waiting: state.categories.waiting,
    categories: state.categories.items
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store])
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select value={select.category} onChange={callbacks.onCategory} size='m' disabled={select.waiting}>
        <option value='all'>Все</option>
        <OptionTree prefix={'-'} array={select.categories} renderItem={item => item.title} />
      </Select>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input size='large' value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);