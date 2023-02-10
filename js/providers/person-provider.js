class PersonProvider {
    constructor() {
    }

    getLastId()
    {
        return this.getIndex().id;
    }

    pushIndex(pointer) {
        let index = this.getIndex();
        let id = index.id;
        index.data[id] = pointer;
        index.id += 1;
        this.setIndex(index);
    }

    setIndex(index) {
        window.localStorage.setItem('data_index', JSON.stringify(index));
    }

    getIndex() {
        let index = window.localStorage.getItem('data_index');
        if(!index) {
            index = '{"id": 0, "data": {}}';
        }
        return JSON.parse(index);
    }

    findKeyById(id) {
        const index = this.getIndex().data;
        for(const indexId in index) {
            if(indexId == id) {
                return index[indexId];
            }
        }
    }

    findById(id) {
        const key = this.findKeyById(id);
        return JSON.parse(window.localStorage.getItem(key));
    }

    findByParams(params, value) {
        return { name: 'test' }
    }

    save(cadastro) {
        cadastro.id = this.getLastId();
        const id = 'pessoa.'+cadastro.id;
        window.localStorage.setItem(id, JSON.stringify(cadastro));
        this.pushIndex(id);
    }

    update(id, cadastro) {
        const key = this.findKeyById(id);
        window.localStorage.setItem(key, JSON.stringify(cadastro));
    }

    delete(id) {
        const key = this.findKeyById(id);
        const index = this.getIndex().data;
        window.localStorage.removeItem(key);
        for(const indexId in index) {
            if(indexId == id) {
                index[indexId] = {};
            }
        }
    }
}
