import DataStorage from "./DataStorage";
import SectionsManagerImpl from "./CouplesSection/SectionsManager";
import SectionsManager from "./CouplesSection/SectionsManager";
import WDisplayListProxyImpl, { WDisplayListProxy } from "./WDisplayList";
import MakeLinkGameConfig from "./game/MakeLinkGameConfig";
import MakeLinkGame from "./game/MakeLinkGame";
import MakeLinkGameImpl from "./game/MakeLinkGame";
import DataStorageImpl from "./DataStorage";

class AppModel {

    wDisplayListProxy: WDisplayListProxy = new WDisplayListProxyImpl(new DataStorageImpl())
    sectionsManager: SectionsManager = new SectionsManagerImpl([], 0)
    private linkGame: MakeLinkGame = new MakeLinkGameImpl([])
    private dataStorage: DataStorage = new DataStorageImpl()

    onGameDidChange?: (() => void)
    onItemsListDidChange?: (() => void)
    onSectionsDidChange?: (() => void)

    constructor() {
        this.dataStorage = new DataStorageImpl();
        this.dataStorage.load().then(() => {
            this.updateToStorage()
        })
    }

    loadFile(fileString: string) {
        this.dataStorage = new DataStorage();
        this.dataStorage.apply(fileString).then(() => {
            this.updateToStorage()
        })
    }

    setStudingSectionId(id: number) {
        this.dataStorage.saveStudiedSectionId(id).then(() => {
            this.updateToStorage()
        })
    }

    private updateToStorage() {
        this.wDisplayListProxy = new WDisplayListProxyImpl(this.dataStorage)
        this.sectionsManager = new SectionsManagerImpl(this.dataStorage.items, this.dataStorage.studiedSectionId);
        this.linkGame = new MakeLinkGameImpl(this.sectionsManager.studingSection()?.items ?? [])

        if (this.onGameDidChange) {
            this.onGameDidChange();
        }

        if (this.onSectionsDidChange) {
            this.onSectionsDidChange();
        }

        if (this.onItemsListDidChange) {
            this.onItemsListDidChange();
        }
    }

    currentMakeLinkGameConfig(): MakeLinkGameConfig {
        return this.linkGame.gameConfig()
    }

    makeLinkGameNextGame(): void {
        this.linkGame.nextGame()
    }
}

export default AppModel;