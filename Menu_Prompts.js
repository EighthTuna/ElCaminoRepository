class Songs{
    constructor(name, album){
        this.name = name;
        this.album = album;
    }
    describe(){
        return `${this.name} is from the album ${this.album}`;
    }
}
class Albums{
    constructor(name){
        this.name = name;
        this.song = [];
    }
    addSong(song){
        if (song instanceof Songs){
            this.song.push(song);
        }else{
            throw new Error(`You can only add the name of a sone here. Argument is not a song: ${song}`)
        }
    }
    describe(){
        return `${this.name} has ${this.song.length} songs.`;
    }
}

class Menu{
    constructor(){
        this.albumlist=[];
        this.selectedAlbum = null;
    }
    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0){
            switch(selection){
                case '1':
                    this.createAlbum();
                    break;
                case '2':
                    this.viewAlbum();
                    break;
                case '3':
                    this.deleteAlbum();
                    break;
                case '4':
                    this.displayAlbum();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert ('Goodbye!');
    }
    showMainMenuOptions(){
        return prompt (`
        0) Exit
        1) Add Album
        2) View Albums
        3) Delete Album
        4) Display Albums
        `)
    }
    showAlbumMenuOptions(albumInfo){
        return prompt(`
        0) Back
        1) Add Song
        2) Delete Song
        ----------------
        ${albumInfo}
        `)
    }
    displayAlbum(){
        let albumString = '';
        for (let i = 0; i < this.albumlist.length; i++){
            albumString += i + ') ' + this.albumlist[i].name + '\n';
        }
        alert(albumString);
    }
    createAlbum(){
        let name = prompt('Enter the name of the Album you wish to add: ');
        this.albumlist.push(new Albums(name));
    }
    viewAlbum(){
        let index = prompt('Enter the index of the Album you wish to view: ');
        if (index > -1 && index < this.albumlist.length){
            this.selectedAlbum = this.albumlist[index];
            let description = 'Album Name' + this.selectedAlbum.name + '\n';
            for (let i = 0; i < this.selectedAlbum.song.length; i++){
                description += i + ')' + this.selectedAlbum.song[i].name + ' - ' + this.selectedAlbum.song[i].album + '\n';
            }
            let selection = this.showAlbumMenuOptions(description);
            switch(selection){
                case '1':
                    this.createSong();
                    break;
                case '2':
                    this.deleteSong();
            }
        }
    }
    deleteAlbum(){
        let index = prompt('Enter the index of the Album you wish to delete: ');
        if(index > -1 && index < this.albumlist.length){
            this.albumlist.splice(index, 1);
        }
    }
    createSong(){
        let name = prompt('Enter the name of the song you wish to add: ');
        let album = prompt('Enter the name of the Album the song belongs to: ');
        this.selectedAlbum.song.push(new Songs(name, album));
    }
    deleteSong(){
        let index = prompt('Enter the index of the song you wish to delete: ');
        if(index > -1 && index < this.selectedAlbum.song.length){
            this.selectedAlbum.song.splice(index, 1);
        }
    }


}

let menu = new Menu();
menu.start();