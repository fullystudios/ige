var igeCoreConfig = {
	include: [
		/* The IGE Core Files */
		'core/IgeBase.js',
		'core/IgeClass.js',
		'core/IgeEventingClass.js',
		'core/IgePoint.js',
		'core/IgePoly2d.js',
		'core/IgeMatrix2d.js',
		'core/IgeMatrixStack.js',
		'components/IgeAnimationComponent.js',
		'components/IgeVelocityComponent.js',
		'components/IgeTweenComponent.js',
		'components/IgePathComponent.js',
		'components/IgeInputComponent.js',
		'components/IgeMousePanComponent.js',
		'components/IgeMouseZoomComponent.js',
		'components/IgeTiledComponent.js',
		'components/physics/box2d/lib_box2d.js',
		'components/physics/box2d/IgeBox2dComponent.js',
		'components/physics/cannon/lib_cannon.js',
		'components/physics/cannon/IgeCannonComponent.js',
		'components/network/IgeTimeSyncExtension.js',
		'components/network/socket.io/client/socket.io.min.js',
		'components/network/socket.io/IgeSocketIoClient.js',
		'components/network/socket.io/IgeSocketIoComponent.js',
		'components/network/net.io/net.io-client/index.js',
		'components/network/net.io/IgeNetIoClient.js',
		'components/network/net.io/IgeNetIoComponent.js',
		'components/network/stream/IgeStreamComponent.js',
		'components/chat/IgeChatClient.js',
		'components/chat/IgeChatComponent.js',
		'components/cocoonjs/IgeCocoonJsComponent.js',
		'extensions/IgeTransformExtension.js',
		'extensions/IgeUiPositionExtension.js',
		'extensions/IgeUiStyleExtension.js',
		'extensions/IgeUiInteractionExtension.js',
		'extensions/IgeStreamExtension.js',
		'extensions/IgeInterpolatorExtension.js',
		'core/IgePathNode.js',
		'core/IgePathFinder.js',
		'core/IgeTween.js',
		'core/IgeTexture.js',
		'core/IgeCellSheet.js',
		'core/IgeSpriteSheet.js',
		'core/IgeFontSheet.js',
		'core/IgeObject.js',
		'core/IgeEntity.js',
		'core/IgeUiEntity.js',
		'core/IgeFontEntity.js',
		'core/IgeParticleEmitter.js',
		'core/IgeMap2d.js',
		'core/IgeMapStack2d.js',
		'core/IgeTileMap2d.js',
		'core/IgeTextureMap.js',
		'core/IgeCollisionMap2d.js',
		'core/IgeCamera.js',
		'core/IgeViewport.js',
		'core/IgeScene2d.js',
		'components/physics/box2d/IgeEntityBox2d.js',
		'components/physics/cannon/IgeEntityCannon.js',
		'ui/IgeUiButton.js',
		'ui/IgeUiRadioButton.js',
		'ui/IgeUiProgressBar.js',
		'ui/IgeUiTextBox.js',
		'ui/IgeUiMenu.js',
		'core/IgeEngine.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeCoreConfig; }