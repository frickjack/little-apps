declare var exports: any;


if ( null == exports ) {
    // Hook to communicate out to YUI module system a YUI module-name for this typescript file
    throw "littleware-asset-netmgr";
}

var lw: any = exports.littleware;

import importY = require("../../../libts/yui");
importY; // workaround for typescript bug: https://typescript.codeplex.com/workitem/1531
import Y = importY.Y;
Y = exports;

import localMgrImport = require("localAssetMgr");
localMgrImport;
import localMgr = localMgrImport.littleware.asset.internal.localMgr;

import littleMgr = require("../assetMgr");
littleMgr;
import axMgr = littleMgr.littleware.asset.manager;

import littleAsset = require("../littleAsset");
littleAsset;
import ax = littleAsset.littleware.asset;


/**
 * @module littleware-asset-localmgr
 * @namespace littleware.asset.internal.localMgr
 */
export module littleware.asset.internal.netMgr {
    var log = new lw.littleUtil.Logger("littleware.asset.internal.netMgr");
    log.log("littleware logger loaded ...");



    /**
     * Factory method to acquire the AssetManager singleton - add sesion management later
     */
    export function getNetManager():axMgr.AssetManager {
        return netMgr;
    }




    /**
     * ManagerCore implementation implements core AssetManager CRUD methods 
     * cooperating with LocalCacheManager to manage local and in-memory cache.
     * @class NetMgrCore
     */
    export class NetMgrCore implements localMgr.ManagerCore {

        constructor(private delegate: localMgr.ManagerCore) { }

        getFromCache(id: string): axMgr.AssetRef {
            return this.delegate.getFromCache(id);
        }

        fire(ev: axMgr.RefEvent): void {
            return this.delegate.fire(ev);
        }

        addListener(listener: (ev: axMgr.RefEvent) => void): Y.EventHandle {
            return this.delegate.addListener(listener);
        }

        saveAsset(value: ax.Asset, updateComment: string): Y.Promise<axMgr.AssetRef> {
            return this.delegate.saveAsset(value, updateComment);
        }

        deleteAsset(id: string, deleteComment: string): Y.Promise<void> {
            return this.delegate.deleteAsset(id, deleteComment);
        }

        loadAsset(id: string): Y.Promise<axMgr.AssetRef> {
            return this.delegate.loadAsset(id);
        }

        loadChild(parentId: string, name: string): Y.Promise<axMgr.AssetRef> {
            return this.delegate.loadChild(parentId, name);
        }

        listChildren(parentId: string): Y.Promise<axMgr.NameIdListRef> {
            return this.delegate.listChildren(parentId);
        }

        listRoots(): Y.Promise<axMgr.NameIdListRef> {
            return this.delegate.listRoots();
        }

    }

    //----------------------------------

    var netMgr: axMgr.AssetManager = null;



}
