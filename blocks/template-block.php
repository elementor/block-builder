<?php
namespace ElementorBlockBuilder\Blocks;

use ElementorBlockBuilder\Plugin;
use Elementor\TemplateLibrary\Source_Local;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Template_Block {

	public function get_name() {
		return 'template';
	}

	public function allow_show_in_rest_elementor_templates() {
		global $wp_post_types;

		if ( isset( $wp_post_types[ Source_Local::CPT ] ) ) {
			$wp_post_types[ Source_Local::CPT ]->show_in_rest = is_user_logged_in();
			$wp_post_types[ Source_Local::CPT ]->rest_base = Source_Local::CPT;
			$wp_post_types[ Source_Local::CPT ]->rest_controller_class = 'WP_REST_Posts_Controller';
		}
	}

	public function register_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'elementor',
					'title' => __( 'Elementor', 'block-builder' ),
				),
			)
		);
	}

	public function register_block() {
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

		// Register our block script with WordPress
		wp_register_script(
			'gutenberg-elementor',
			BLOCK_BUILDER_ASSETS_URL . 'js/template-block' . $suffix . '.js',
			[
				'wp-blocks',
				'wp-element',
			],
			ELEMENTOR_BLOCK_BUILDER_VERSION,
			true
		);

		wp_register_style(
			'gutenberg-elementor',
			BLOCK_BUILDER_ASSETS_URL . 'css/template-block' . $suffix . '.css',
			[],
			ELEMENTOR_BLOCK_BUILDER_VERSION
		);

		register_block_type(
			'elementor/' . $this->get_name(),
			[
				'render_callback' => [ $this, 'elementor_template_block_render' ],
				'editor_script' => 'gutenberg-elementor',
				'editor_style' => 'gutenberg-elementor',
			]
		);

		// Prepare Jed locale data manually to avoid printing all of Elementor translations.
		$locale_data = [
			'' => [
				'domain' => 'block-builder',
				'lang' => is_admin() ? get_user_locale() : get_locale(),
			],
			'Elementor Template' => [ __( 'Elementor Template', 'block-builder' ) ],
			'Edit Template with Elementor' => [ __( 'Edit Template with Elementor', 'block-builder' ) ],
			'Selected Elementor Template' => [ __( 'Selected Elementor Template', 'block-builder' ) ],
			'No Template Selected' => [ __( 'No Template Selected', 'block-builder' ) ],
			'Select a Template' => [ __( 'Select a Template', 'block-builder' ) ],
			'No templates Found' => [ __( 'No templates Found', 'block-builder' ) ],
			'loading' => [ __( 'loading', 'block-builder' ) ],
		];

		wp_add_inline_script(
			'gutenberg-elementor',
			'wp.i18n.setLocaleData( ' . wp_json_encode( $locale_data ) . ', \'block-builder\' );',
			'before'
		);
	}

	public function elementor_template_block_render( $attributes ) {
		if ( isset( $attributes['selectedTemplate'] ) ) {
			Plugin::$instance->elementor()->frontend->get_builder_content( $attributes['selectedTemplate'], true );
		}
	}

	public function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'init', [ $this, 'allow_show_in_rest_elementor_templates' ], 250 );

		add_filter( 'block_categories', [ $this, 'register_block_category' ], 10, 2 );
	}
}
